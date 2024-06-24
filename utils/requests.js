const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch All Properties
export async function fetchProperties() {
  try {
    // Handle the case where the domain is not availabe yet
    if (!apiDomain) {
        return [];
    };

    const res = await fetch(`${apiDomain}/properties`);

    if (!res.ok) {
      throw new Error('Failed to fetch data...');
    };

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  };
};

// Fetch Single Property
export async function fetchProperty(id) {
  try {
    // Handle the case where the domain is not availabe yet
    if (!apiDomain) {
        return null;
    };

    const res = await fetch(`${apiDomain}/properties/${id}`);

    if (!res.ok) {
      throw new Error('Failed to fetch data...');
    };

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  };
};
