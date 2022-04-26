const searchVal = document.querySelector('.searchVal');
const containerList = document.querySelector('.mainConrainer');

let pageNo = 1;

async function showData() {

    containerList.innerHTML = "";
    let searchedVal = searchVal.value.trim();
    // console.log(searchedVal);

    if (searchedVal) {
        const res = await fetch(`http://www.omdbapi.com/?s=${searchedVal}&page=${pageNo}&apikey=6fc536c9`);
        const actualData = await res.json();
        // console.log(searchVal.value);
        console.log(actualData);

        if (actualData.Response == "False") {
            containerList.innerHTML = "<h3 class='error'>Sorry Data not Found</h3>"
        }
        else {
            actualData.Search.forEach((singleMovie) => {
                // console.log(actualData.totalResults);
                const htmlData = `
                    <div class="movie">
                        <img src="${singleMovie.Poster}" alt="Img" class="movie__img">
                        <div class="info__Container">
                            <p class="movie__name">${singleMovie.Title}  (${singleMovie.Year})</p>
                            <p class="movie__year"><b>Type: </b>${singleMovie.Type}</p>
                        </div>
                    </div>
                    
                    `;

                containerList.innerHTML += htmlData;
            });
            containerList.innerHTML += `
            <div class="btnContainer">
                <button class="prev"> <i class="fa fa-arrow-left" aria-hidden="true"></i> </button>
                <button class="current"> ${pageNo} </button>
                <button class="next"> <i class="fa fa-arrow-right" aria-hidden="true"></i> </button>
            </div>`;
            const nextBtn = document.querySelector('.next');
            // console.log(nextBtn);
            const prevBtn = document.querySelector('.prev');

            if (pageNo < 2) {
                prevBtn.disabled = true;
            }
            prevBtn.addEventListener('click', () => {
                {
                    pageNo--;
                    showData();
                }
            })
            nextBtn.addEventListener('click', () => {
                pageNo++;
                showData();
            })
        }
    }
    else {
        containerList.innerHTML = `<h4 class="error">Search for Movies</h4>`;
    }
}

searchVal.addEventListener('change', showData)