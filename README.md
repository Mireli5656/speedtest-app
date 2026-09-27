# Speed Test - Network Performance Testing Tool

A modern, fast, and accurate internet speed test application built with pure HTML, CSS, and JavaScript. Test your internet connection speed from anywhere using GitHub Pages.

## Features

✅ **No Backend Required** - Pure frontend implementation
✅ **Mobile & Desktop Responsive** - Works perfectly on all devices
✅ **Real-time Visualization** - Animated speedometer and live graph
✅ **Accurate Measurements** - Ping, Download, and Upload tests
✅ **Auto Server Detection** - Automatically finds nearest server
✅ **Dark Modern UI** - Beautiful glassmorphism design
✅ **No Installation** - Just open in your browser

## Live Demo

🌐 Visit: [Speed Test on GitHub Pages](https://mireli5656.github.io/speedtest-app/)

## How to Use

1. Visit the application link above
2. Click the "Go" button to start the speed test
3. Wait for the test to complete (about 30 seconds)
4. View your results:
   - **Ping** - Latency in milliseconds
   - **Download** - Speed in Mbps
   - **Upload** - Speed in Mbps
5. Watch the real-time graph as speeds are measured

## Measurements

### Ping
- Measures latency to the nearest server
- 5 consecutive attempts with average calculation
- Displayed in milliseconds (ms)

### Download Speed
- Tests file download from GitHub CDN
- Measures bytes received over time
- Displayed in Mbps (megabits per second)

### Upload Speed
- Simulates file upload to test server
- Measures bytes sent over time
- Displayed in Mbps (megabits per second)

## Technical Details

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with flexbox and grid
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **Canvas API** - Real-time graph rendering
- **Fetch API** - Network requests
- **GitHub Pages** - Free hosting

## Browser Support

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Installation

To run locally:

```bash
# Clone the repository
git clone https://github.com/mireli5656/speedtest-app.git

# Navigate to the directory
cd speedtest-app

# Open index.html in your browser
open index.html
```

## Deployment

The app is already deployed on GitHub Pages. To deploy your own version:

1. Fork this repository
2. Enable GitHub Pages in settings
3. Select `main` branch as the source
4. Your app will be available at `https://yourusername.github.io/speedtest-app/`

## File Structure

```
speedtest-app/
├── index.html      # Main HTML file
├── styles.css      # Styling
├── app.js          # JavaScript logic
└── README.md       # Documentation
```

## Performance Considerations

- Tests use public, CORS-enabled servers
- Results may vary based on network conditions
- Multiple attempts are made to ensure accuracy
- Graph updates in real-time during testing

## Troubleshooting

**Test shows N/A:**
- Check your internet connection
- Ensure cookies/storage is enabled
- Try a different browser

**Inconsistent results:**
- Network conditions vary
- Close other applications using bandwidth
- Run test multiple times for average

**Gauge not moving:**
- Ensure JavaScript is enabled
- Check browser console for errors
- Refresh the page

## Privacy & Security

- No data is stored or transmitted
- All processing happens locally
- HTTPS connections only
- No tracking or analytics

## License

MIT License - Feel free to use and modify!

## Contributing

Contributions are welcome! Please feel free to submit pull requests.

## Author

Created with ❤️ by Mireli5656

---

**Enjoy testing your internet speed! 🚀**