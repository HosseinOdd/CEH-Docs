# LocalStorage Cleanup

If you have old localStorage keys from previous versions, you can clean them up:

## Open Browser Console and run:

```javascript
// Remove old docsify theme key
localStorage.removeItem('docsifyTheme');

// Check current keys
console.log('Current localStorage:');
console.log('Theme:', localStorage.getItem('theme'));
console.log('Locale:', localStorage.getItem('preferred-locale'));
```

## Current localStorage keys used:
- `theme` - Theme preference (light/dark/system) - managed by next-themes
- `preferred-locale` - Language preference (en/fa) - managed by our code
