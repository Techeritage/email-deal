export const saveEmail = async (email: string) => {
  try {
    const res = await fetch("https://email-deal.vercel.app/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getEmails = async () => {
  try {
    const res = await fetch("https://email-deal.vercel.app/api/email", {
      method: "GET",
      cache: "no-store", // Ensures the fetch result is not cached
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
