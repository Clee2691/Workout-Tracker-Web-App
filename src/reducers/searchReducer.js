import React from "react";

const defaultState = {allRecipes:[]};

const searchPageReducer = (state = defaultState, action) => {
    switch(action.type) {
        case "search":
            let newState = {
                allRecipes: action.data
            }
            return newState;

        case 'resetSearch':
            return defaultState;

        default:
            return state;
    }
}

export default searchPageReducer;