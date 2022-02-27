const TOM_TOM_API_KEY = "sAySjo9SKcvsUOpYgP6XTSmMqmpnGHEY"

const mapElement = document.querySelector(".map")

function watchPosition() {
    navigator.geolocation.watchPosition(showResults, showError.apply)
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            window.location = window.location + "permission-denied"
            break
        case error.POSITION_UNAVAILABLE:
            window.location = window.location + "position-unavailable"
            break
        case error.TIMEOUT:
            window.location = window.location + "timeout"
            break
        case error.UNKNOWN_ERROR:
            window.location = window.location + "unknown-error"
            break
    }
}

function showResults(position) {
    showPosition(position)
}

function showPosition(position) {
    const lngLat = [position.coords.longitude, position.coords.latitude]
    const userElement = document.createElement("div")
    mapElement.appendChild(userElement)
    userElement.classList.add("user")

    const map = tt.map({
        key: TOM_TOM_API_KEY,
        container: mapElement,
        stylesVisibility: {
            trafficIncidents: true,
            trafficFlow: true
        },
        center: lngLat,
        zoom: 17
    })

    const user = new tt.Marker({
        element: userElement
    })
        .setLngLat(lngLat)
        .addTo(map)

    showPosition = function (position) {
        const lngLat = [position.coords.longitude, position.coords.latitude]
        user.setLngLat(lngLat)

        // const data = ``

        // fetch(`http://overpass-api.de/api/interpreter?data=${data}`)
        //     .then(data => data.json())
        //     .then(response => {
        //         document.querySelector("node").forEach(node => node.remove())
        //         response.elements.forEach(node => {
        //             const nodeElement = document.createElement("div")
        //             mapElement.appendChild(nodeElement)
        //             // nodeElement.classList.add("")
        //             nodeElement.classList.add("node")
        //             new tt.Marker({
        //                 element: nodeElement
        //             })
        //                 .setLngLat([node.lon, node.lat])
        //                 .addTo(map)
        //         })
        //     })
        // FIXME: Error handling for the request -- error counter || timeout strategy
    }
}

watchPosition()

const filterBtn = document.querySelector("#filter-toggle")
const filtersPage = document.querySelector(".filters")
filterBtn.addEventListener("click", () => {
    filtersPage.classList.toggle("active")
})

const profileBtn = document.querySelector("#profile-toggle")
const profilePage = document.querySelector(".profile")
profileBtn.addEventListener("click", () => {
    profilePage.classList.toggle("active")
})

const blogBtn = document.querySelector("#blog-toggle")
const blogPage = document.querySelector(".blog")
blogBtn.addEventListener("click", () => {
    blogPage.classList.toggle("active")
})