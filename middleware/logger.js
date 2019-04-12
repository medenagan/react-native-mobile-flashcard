const logger = (store) => (next) => (action) => {
    const returnValue = next(action);
    console.group(action.type);
    console.log("action", action);
    console.log("state", store.getState());
    console.log("returnValue", returnValue);
    console.groupEnd();
    return returnValue;
};

export default logger;
