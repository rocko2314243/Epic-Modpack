alert("Epic Modpack loaded!")

var epicModpack = {
    clientVersion: 0,
    firstCheck: true,
    showUpdate: true,
    updateChecks: 0
}
window.epicModpack = epicModpack;

function fetchVersion() {
    fetch("https://raw.githubusercontent.com/Epic43110/Epic-Modpack/main/version.json", {mode: "cors"})
        .then((response) => response.text())
        .then((data) => {
            epicModpack.updateChecks += 1;
            data = JSON.parse(data)
            var liveVersion = data.version;
            var lastUpdate = data.lastUpdated;
            var info = data.info;
            if (epicModpack.firstCheck) {
                if (epicModpack.clientVersion != liveVersion) {
                    epicModpack.clientVersion = liveVersion;
                    alert(`Epic Modpack updated while you were gone!\nUpdate Version ${liveVersion} | ${lastUpdate}\nUpdate Recieved: ${new Date}\nUpdate Info: ${info}`)
                }
                localStorage.epicVersion = epicModpack.clientVersion;
                epicModpack.firstCheck = false;
            }

            if (epicModpack.clientVersion != liveVersion && epicModpack.showUpdate) {
                epicModpack.showUpdate = false;
                if (confirm(`Update required for Epic Modpack!\nUpdate Version: ${liveVersion} | ${lastUpdate}\nUpdate Recieved: ${new Date}\nUpdate info: ${info}\n\nModpack will update next time you open BetterMope.\nWould you like to update right now? (This will refresh your page)`)) {
                    localStorage.epicVersion = liveVersion;
                    location.reload();
                }
            }
        })
}

setInterval(fetchVersion, 5000)
