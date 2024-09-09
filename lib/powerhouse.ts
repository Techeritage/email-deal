export const saveEmail = async (email: string) => {
  try {
    const res = await fetch("http://localhost:3000/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const result = await res.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
