const search = document.getElementById('search');
//console.log(search);
const submit = document.getElementById('submit');
const resultHeading = document.getElementById('meal-result-heading');
const mealsEl = document.getElementById('meals');
const single_mealEl = document.getElementById('single-meal-container');
// const mealID = document.getElementById('meal_id');

//submit.addEventListener('submit', findmeal);

function findmeal(e) {

    e.preventDefault();
    const item = search.value;
    //console.log(item);
    if (item.trim()) {
        //alert("data is present");
        //fetch api data and display in browser
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`)
            .then((res) => res.json())
            .then((data) => {
                //convert the data of object
                //console.log(data);

                resultHeading.innerHTML = `Search Result for ${item}`;

                //if condition
                if (data.meals === null) {

                    resultHeading.innerHTML = `Oops !! No result for meal ${item}`;
                } else {

                    mealsEl.innerHTML = data.meals.map((meal) => `<div class="meal">
                    <img src="${meal.strMealThumb}"  alt="${meal.strMeal}">
                    
                    <div class="meal-info" data-mealId="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                    </div>

                          </div>`)
                        .join("") //return array as a string 
                }


            });
        //clear input field
        search.value = ""; //empty string
    } else {
        alert("please enter item name");
    }
}




//function to get mealId

function getsingleItemID(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then((res) => (res.json())
            .then((data) => {
                // console.log(data);
                const meal = data.meals[0];
                // console.log(meal)
                addMealToDOM(meal);
            })
        )

}

// function to add meals to dom

function addMealToDOM(meal) {

    const ingredients = []; // empty array
    for (let i = 1; i < 20; i++) {

        if (meal[`strIngredient${i}`]) {
            ingredients.push(
                    `${meal[`strIngredient${i}`]} ~ ${meal[`strMeasure${i}`]}`)
        }
        else{
            break;
        }

    }

    //console.log(ingredients);

   single_mealEl.innerHTML=`
    <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <div class="single-meal-info">
    ${meal.strCategory ?`<p>${meal.strCategory}</p>` :""}
    ${meal.strArea ? `<p>${meal.strArea}</p>`:""}
    </div>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
    <div class="main">
          <h2>Ingredients</h2>
          <ul>

              ${ingredients.map((values)=>`<li>${values}</li>`).join("")}
          </ul>
          <h2>Instructions</h2>
          <p>${meal.strInstructions}</p>
        </div>
    </div>`;
}


submit.addEventListener('submit', findmeal);

//Single meal click

//Error---------------
mealsEl.addEventListener('click', (e) => {
    const mealInfo = e.composedPath().find((single_item) => {
        //console.log(single_item);

        if (single_item.classList) {
            return single_item.classList.contains("meal-info");

        } else {
            return false;
        }
    });
    //console.log(mealInfo);

    if (mealInfo) {
        const mealID = mealInfo.getAttribute("data-mealId");
        //console.log(mealID)
        getsingleItemID(mealID);

    }



})
