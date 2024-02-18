import * as types from '../actions/ActionTypes';

// 초기 상태를 정의합니다
const initialState = {
    color: 'black',
    number: 0
};

function counter(state = initialState, action:any) {
    switch (action.type) {
        case types.INCREMENT: 
            return {
                ...state,
                number: state.number + 1
            };
        case types.DECREMENT:
            return {
                ...state,
                number: state.number - 1
            };
        case types.SET_COLOR:
            return {
                ...state,
                color: action.color
            };
        default:
            return state;
    }
};

export default counter;