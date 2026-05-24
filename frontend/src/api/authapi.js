const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4444";

const getErrorMessage = async (res, fallbackMessage) => {
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
        const errorData = await res.json();
        return errorData.error || errorData.message || fallbackMessage;
    }

    return fallbackMessage;
};

export const signUpData = async (userData) => {
    try {

        console.log(userData);
        
        const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
            credentials: "include"
        });

        if (!res.ok) {
            throw new Error(await getErrorMessage(res, "Signup failed"));
        }

        const data = await res.json();
        return data;

    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
};


export const loginData = async (userData) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
            credentials: 'include'
        });

        if (!res.ok) {
            throw new Error(await getErrorMessage(res, "Login failed"));
        }

        const data = await res.json();
        return data;

    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
};

export const logoutData = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error(await getErrorMessage(res, "Logout failed"));
        }

        return await res.json();
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
};
