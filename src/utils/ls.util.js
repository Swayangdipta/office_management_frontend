export const setAuthInSessionStorage = (data) => {
    if (!data || typeof data !== "object") {
        throw new Error("Invalid data. Expected an object.");
    }

    try {
        // Convert data object to JSON string and save in session storage
        sessionStorage.setItem("auth", JSON.stringify(data));
        return true
    } catch (error) {
        return false
    }
};

export const getAuthFromSessionStorage = () => {
    try {
        // Retrieve the JSON string from session storage
        const authData = sessionStorage.getItem("auth");

        // Parse and return the object, or null if no data exists
        return authData ? JSON.parse(authData) : null;
    } catch (error) {
        return null;
    }
};
