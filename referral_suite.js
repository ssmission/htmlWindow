const homeURL = document.currentScript.getAttribute('home-page');
const iframeBox = document.getElementById('iframeBox');

function GrabPage(thisUrl) {
    fetch(thisUrl)
    .then((response) => response.text())
    .then((text) => {
        setPage(text);
    });
}
function fixUrl(text, regex, linkType) {
    return text.replace(regex, function (match, capture) {
        console.log(capture, match);
        if (capture.includes('https://') || capture.includes('https://')) {
            return linkType + '="' + new URL(capture).href + '"';
        } else {
            return linkType + '="' + new URL(capture, homeURL).href + '"';
        }
    });
}
function fixLink_RAW(capture) {
    if (capture.includes('https://') || capture.includes('https://')) {
        return new URL(capture).href;
    } else {
        return new URL(capture, homeURL).href;
    }
}
function setPage(text) {
    //replace src and href urls
    text = fixUrl(text, /src\s*=\s*"(.+?)"/gi, 'src');
    text = fixUrl(text, /href\s*=\s*"(.+?)"/gi, 'href');
    //text += '<script src="redirect_controller.js"></script>'
    //console.log(text);

    iframeBox.innerHTML = '<iframe src=""></iframe>';
    iframeBox.lastChild.contentWindow.document.write(text);
}
window.addEventListener('message', function (e) {
    const decoded = JSON.parse(e.data);
    console.log(decoded);
    if (decoded.type == 'redirect') {
        alert(decoded.data + ', ' + fixLink_RAW(decoded.data) );
        GrabPage( fixLink_RAW(decoded.data) );
    }
});
GrabPage(homeURL);
