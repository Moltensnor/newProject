const headers = new Headers();
  headers.set(
    "Authorization",
    "Basic " + Buffer.from(process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD).toString("base64")
  );
  const postHeader = headers;
  postHeader.append("Content-Type", "application/json");

  export async function getRequestCall(url: string) {
    console.log(`Making a GET request to ${url}`)
    const req = await fetch(
        url ,
        {
          cache: "no-store",
          method: "GET",
          headers: headers,
        }
      );
  
      const res = await req.json();
      return res
  }

  export async function postRequestCall(url: string, body: any) {
    console.log(`Making a POST request to ${url}`)
    const req = await fetch(url, {
        method: "POST",
        headers: postHeader,
        body: JSON.stringify(body),
      });

      const res = await req.json();
      return res
  }

  export async function deleteRequestCall(url: string) {
    console.log(`Making a DELETE request to ${url}`)
    const req = await fetch(
        url ,
        {
          cache: "no-store",
          method: "DELETE",
          headers: headers,
        }
      );
  }