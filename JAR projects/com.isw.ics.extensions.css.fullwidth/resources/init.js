dojo.provide("com.isw.ics.extensions.css.fullwidth.init");
console.log('full width loaded');
if(iswExtensions) {
  iswExtensions.addCssStyle('.lotusui30 .lotusFrame .lotusBanner .lotusInner, .lotusui30 .lotusFrame .lotusTitleBar2 .lotusWrapper,.lotusFrame .lotusMain, .lotusui30 .lotusBoard .lotusStream .lotusPost .lotusPostContent {max-width:100%;}');
} else console.error('missing dependency - iswExtensions');
