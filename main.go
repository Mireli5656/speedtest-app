package main

import (
    "encoding/json"
    "fmt"
    "io"
    "log"
    "net/http"
    "os"
    "path/filepath"
    "strconv"
    "strings"
    "time"
)

func main() {
    mux := http.NewServeMux()

    mux.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        _ = json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
    })

    mux.HandleFunc("/api/servers", func(w http.ResponseWriter, r *http.Request) {
        type server struct {
            Name string `json:"name"`
            URL  string `json:"url"`
        }

        items := []server{
            {Name: "Cloudflare Global", URL: "https://speed.cloudflare.com"},
            {Name: "Cloudflare Main", URL: "https://www.cloudflare.com"},
            {Name: "Cloudflare CDN", URL: "https://cdnjs.cloudflare.com"},
        }

        w.Header().Set("Content-Type", "application/json")
        _ = json.NewEncoder(w).Encode(items)
    })

    mux.HandleFunc("/api/upload", handleUpload)
    mux.HandleFunc("/api/download", handleDownload)

    staticDir := filepath.Join(".", "web")
    mux.Handle("/", http.FileServer(http.Dir(staticDir)))

    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }

    addr := fmt.Sprintf(":%s", port)
    log.Printf("Speedtest app started on http://localhost%s", addr)
    log.Fatal(http.ListenAndServe(addr, mux))
}

func handleUpload(w http.ResponseWriter, r *http.Request) {
    start := time.Now()

    if err := r.ParseMultipartForm(32 << 20); err != nil {
        http.Error(w, "invalid upload", http.StatusBadRequest)
        return
    }

    file, _, err := r.FormFile("file")
    if err != nil {
        http.Error(w, "missing file", http.StatusBadRequest)
        return
    }
    defer file.Close()

    data, err := io.ReadAll(file)
    if err != nil {
        http.Error(w, "could not read file", http.StatusInternalServerError)
        return
    }

    elapsed := time.Since(start)
    bytes := len(data)
    mbps := 0.0
    if elapsed.Seconds() > 0 {
        mbps = float64(bytes) * 8 / (elapsed.Seconds() * 1_000_000)
    }

    w.Header().Set("Content-Type", "application/json")
    _ = json.NewEncoder(w).Encode(map[string]interface{}{
        "status":    "ok",
        "bytes":     bytes,
        "ms":        elapsed.Milliseconds(),
        "mbps":      mbps,
        "server":    "local-backend",
        "timestamp": time.Now().UTC().Format(time.RFC3339Nano),
    })
}

func handleDownload(w http.ResponseWriter, r *http.Request) {
    sizeParam := r.URL.Query().Get("size")
    if sizeParam == "" {
        sizeParam = "8"
    }

    sizeMB, err := strconv.Atoi(sizeParam)
    if err != nil || sizeMB <= 0 {
        sizeMB = 8
    }
    if sizeMB > 64 {
        sizeMB = 64
    }

    // Generate a deterministic stream so browsers can download it quickly without generating huge memory.
    totalBytes := sizeMB * 1024 * 1024
    w.Header().Set("Content-Type", "application/octet-stream")
    w.Header().Set("Content-Disposition", "attachment; filename=speedtest.bin")
    w.Header().Set("Content-Length", strconv.Itoa(totalBytes))

    chunk := make([]byte, 256*1024)
    for i := range chunk {
        chunk[i] = byte((i * 17) % 251)
    }

    remaining := totalBytes
    for remaining > 0 {
        n := len(chunk)
        if remaining < n {
            n = remaining
        }
        if _, err := w.Write(chunk[:n]); err != nil {
            return
        }
        remaining -= n
    }
}

func printRouteInfo() {
    _ = strings.TrimSpace
}

