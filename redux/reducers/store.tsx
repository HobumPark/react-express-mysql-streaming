import counter from "./index";
import {configureStore} from "@reduxjs/toolkit"
// 스토어 생성
const store = configureStore({reducer:counter});
    
export default store;