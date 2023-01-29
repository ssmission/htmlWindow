document.addEventListener(`click`, e => {
    const origin = e.target.closest(`a`);
    
    if (origin) {
        e.preventDefault();
        //console.log(origin.href);
        homeURL = origin.href.substring(0,document.URL.lastIndexOf('/'));         
        if (origin.href == "") {
            homeURL = RealHome;
        }
        console.log(origin.href, homeURL);
        GrabPage(origin.href);
    }
});
window.onbeforeunload = function() {
    return "Data will be lost if you leave the page, are you sure?";
};
