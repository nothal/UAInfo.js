# UAInfo.js
Get Simple UserAgent The Easy Way

# How To Use
Download `uainfo.js` to your project directory
```html
    <script src="uainfo.js" charset="utf-8"></script>
```
Start Using `UAInfo.js`
```js
var ua = getUA();

// get browser name, version
var browser = ua.broswer.name;
var b_ver = ua.broswer.version;

// get OS name, version
var os = ua.OS.name;
var os_ver = ua.OS.version;

// get WebKit build
var _webkit_build = ua.AppleWebKit;
var _safari = ua.Safari;
```
