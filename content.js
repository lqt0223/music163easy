var playerControl = document.getElementById("g_player").children[0];
var prvButton = playerControl.children[0];
var playButton = playerControl.children[1];
var nextButton = playerControl.children[2];
var songRef = document.getElementsByClassName("head j-flag")[0];
var mutationObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function () {
        notify();
    });
});

var config = {
    attributes: true,
    childList: true
};
mutationObserver.observe(songRef, config);

chrome.runtime.onMessage.addListener(function (sender) {
    switch (sender) {
    case "previous":
        prvButton.click();
        // when click on prv or next, if paused, make it play automatically
        autoPlay();
        break;
    case "next":
        nextButton.click();
        autoPlay();
        break;
    case "pause":
        playButton.click();
        break;
    }
});

function autoPlay() {
    var playButton = playerControl.children[1];
    var dataAction = playButton.attributes[2];
    if (dataAction.nodeValue == "play") {
        playButton.click();
    }
}

function notify() {
    //close the previous notification that hasn't disappeared??

    setTimeout(function () { // wait for the song to change, and get current song info.
        var currentSongName = document.getElementsByClassName("fc1 f-fl")[0];
        currentSongName = currentSongName.attributes[3].nodeValue;
        var currentArtist = document.getElementsByClassName("by f-fl");
        currentArtist = currentArtist[0].textContent;
        var currentAlbumCover = document.getElementsByClassName("head j-flag")[0];
        currentAlbumCover = currentAlbumCover.children[0];
        currentAlbumCover = currentAlbumCover.attributes[0].nodeValue;
        currentAlbumCover = currentAlbumCover.split("?")[0];
        currentAlbumCover += "?param=80y80";

        var notification = new Notification(currentSongName, {
            icon: currentAlbumCover,
            body: currentArtist,
        });

        notification.onclick = function () {
            window.focus();
        };

        setTimeout(function () {
            notification.close();
        }, 3500);

        //when many notifications loaded and user closes the tab before notifications vanish, they will stay there??

    }, 100);

}