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

export const saveItem = async ({
  title,
  link,
  imageUrl,
}: {
  title: string;
  link: string;
  imageUrl: string;
}) => {
  try {
    const res = await fetch("http://localhost:3000/api/item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, link, imageUrl }),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateItem = async ({
  title,
  link,
  imageUrl,
  id
}: {
  title: string;
  link: string;
  imageUrl: string;
  id?: string;
}) => {
  try {
    const res = await fetch(`http://localhost:3000/api/item?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, link, imageUrl }),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getEmails = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/email", {
      method: "GET",
      cache: "no-store", // Ensures the fetch result is not cached
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getItems = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/item", {
      method: "GET",
      cache: "no-store", // Ensures the fetch result is not cached
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
