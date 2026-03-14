# Troubleshooting Guide for Dino

## Common Issues and Solutions

### Extension Not Appearing in Chrome

**Problem:** After loading the extension, Dino doesn't appear in the extensions list.

**Solution:**
1. Ensure Developer Mode is enabled in Chrome extensions page
2. Click "Reload" button for the Dino extension
3. Verify that the file path in "Load unpacked" contains the correct folder structure
4. Check that manifest.json exists in the root directory

### Extension Crashes or Doesn't Work on Certain Websites

**Problem:** Dino features are not functioning on specific websites.

**Solution:**
1. Check if the website uses restrictive Content Security Policy (CSP)
2. Try disabling other extensions that may conflict
3. Clear the extension's cache and reload the extension
4. Verify the website is not on Chrome's restricted list (chrome://, chrome-extension://)

### Font Changes Not Applying

**Problem:** Changing fonts in the Dino popup doesn't affect the webpage.

**Solution:**
1. Ensure content scripts are enabled for the current site
2. Verify CSS is not being overridden by website's !important declarations
3. Try reloading the webpage after changing font settings
4. Check browser console for any JavaScript errors

### Translation Feature Not Working

**Problem:** Translation feature returns empty or error results.

**Solution:**
1. Check internet connection
2. Verify API key is valid (if using external translation service)
3. Confirm the text is selected before clicking translate
4. Try translating a shorter text first

### Performance Issues

**Problem:** Extension slows down webpage loading or causes lag.

**Solution:**
1. Disable auto-scrolling feature if not in use
2. Reduce the number of visual enhancements (link borders, paragraph highlights)
3. Clear extension storage in Chrome settings
4. Update to the latest version of the extension

### Audio/Text-to-Speech Not Working

**Problem:** "Listen to webpage" feature produces no sound.

**Solution:**
1. Check system volume is not muted
2. Verify browser permissions for audio output
3. Test with a different website to isolate the issue
4. Check if browser's Text-to-Speech is working (try Google Translate)

## Getting Help

If your issue is not listed here:
1. Check the [GitHub Issues](https://github.com/developer-diganta/Dino/issues) page
2. Create a new issue with detailed information about your problem
3. Include: OS version, Chrome version, steps to reproduce, and any error messages

## Reporting Bugs

When reporting bugs, please include:
- Browser and OS version
- Steps to reproduce the issue
- Expected behavior vs actual behavior
- Screenshots if applicable
- Extension version number
