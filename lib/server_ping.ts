export const sendPing = async (servers: any[]) => {
  const pingPromises = servers.map(async (server) => {
    const { url, method, params } = server;
    if (method === 'POST') {
      const formData = new URLSearchParams(params);
      return fetch(url, {
        method: 'POST',
        body: formData,
      });
    } else {
      const queryParams = new URLSearchParams(params).toString();
      return fetch(`${url}?${queryParams}`, {
        method: 'GET',
      });
    }
  });

  await Promise.all(pingPromises);
};
