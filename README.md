# Vidstack Player

[![package-badge]][package]
[![license-badge]][license]
[![semantic-release-badge]][semantic-release]
![release][release-badge]
[![codecov-badge]][codecov]
[![jsdelivr-badge]][jsdelivr]

A customizable, extensible, accessible and universal media player. The successor to
[Vime][vime] `5.x` and [Plyr][plyr] `3.x`.

## 🚨 Alpha

This pre-release is not yet feature complete or API stable. Please use at your own risk until the
stable release is available. Issues are welcome for unexpected changes.

## 💿 Installation

### NPM

```bash
$: npm install @vidstack/player@next --save
```

### CDN

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@vidstack/player@next"
></script>
```

## 📖 Documentation

Documentation is currently not available.

## 🖥️ Browsers

Vidstack Player is built for the modern web and avoids bloated polyfills and outdated environments
as much as possible. It'll only support browsers that fully implement the
[Custom Elements V1][caniuse-custom-el-v1] and [CSS Parts][caniuse-css-parts] specifications.

- Edge 79+
- Firefox 72+
- Chrome 73+
- Safari 13.1+
- Opera 64+
- iOS Safari 13.7+
- Android Browser 81+
- Opera Mobile 59+
- Chrome for Android 88+

[caniuse-custom-el-v1]: https://caniuse.com/custom-elementsv1
[caniuse-css-parts]: https://caniuse.com/mdn-css_selectors_part

## 🔨 Contributing

See [CONTRIBUTING.md](./.github/CONTRIBUTING.md).

## 📝 License

Vidstack Player is [MIT licensed](./LICENSE).

[vime]: https://github.com/vime-js/vime
[plyr]: https://github.com/sampotts/plyr
[package]: https://www.npmjs.com/package/@vidstack/player
[package-badge]: https://img.shields.io/npm/v/@vidstack/player/next
[codecov]: https://codecov.io/gh/vidstack/player
[codecov-badge]: https://codecov.io/gh/vidstack/player/branch/main/graph/badge.svg?token=0TCCG1EU8I
[license]: https://github.com/vidstack/player/blob/main/LICENSE
[license-badge]: https://img.shields.io/github/license/vidstack/player?color=blue
[semantic-release]: https://github.com/semantic-release/semantic-release
[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[jsdelivr]: https://www.jsdelivr.com/package/npm/@vidstack/player
[jsdelivr-badge]: https://data.jsdelivr.com/v1/package/npm/@vidstack/player/badge?style=rounded
[release-badge]: https://github.com/vidstack/player/workflows/Release/badge.svg?branch=main
