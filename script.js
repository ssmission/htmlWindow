let findingURL = document.currentScript.getAttribute('current-page');
var homeURL = document.currentScript.getAttribute('home-page');
const RealHome = homeURL;
if (findingURL == null) {
    if (homeURL == null) {
        throw new Error('Must supply some kind of page URL');
    } else {
        findingURL = homeURL;
    }
}
const currentURL = findingURL;
console.log(currentURL);

function GrabPage(thisUrl) {
    fetch(thisUrl)
    .then((response) => response.text())
    .then((text) => {
        OverwritePage(text);
    });
}
function fixUrl(text, regex, linkType) {
    return text.replace(regex, function (match, capture) {
        console.log(capture, match);
        if (capture.includes('https://') || capture.includes('https://')) {
            return linkType + '="' + new URL(capture).href + '"';
        } else {
            return linkType + '="' + new URL(capture, currentURL).href + '"';
        }
    });
}
function OverwritePage(text) {
    //console.log(text);

    //replace src and href urls
    text = fixUrl(text, /src\s*=\s*"(.+?)"/gi, 'src');
    text = fixUrl(text, /href\s*=\s*"(.+?)"/gi, 'href');
    
    //document.documentElement.innerHTML = '';
    document.open();
    document.write(text + '<script src="redirect.js"></script>');
    document.close();
}
GrabPage(currentURL);
