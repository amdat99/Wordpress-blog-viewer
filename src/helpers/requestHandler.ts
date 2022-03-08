export const serverUrl: string = "http://127.0.0.1:81/wordpress/wp-json/wp/v2/";

type Params = {
  url?: string;
  route: string;
  type: string;
  body?: any;
  credentials?: "same-origin" | "include" | "omit";
  contentType?: string;
};

const onUnAuthorised = () => {
  //   localStorage.removeItem("user_data");
  window.location.reload();
};
export const requestHandler = async ({
  url = serverUrl,
  route,
  type,
  body,
  credentials = "include",
  contentType = "application/json",
}: Params) => {
  try {
    console.log("route: ", route, "type: ", type, "body: ", body);
    const response = await fetch(url + route, {
      method: type,
      credentials: credentials,
      headers: { "Content-Type": contentType },
      body: body && (contentType === "application/json" ? JSON.stringify(body) : body),
    });
    if (response.status === 404) {
      return onUnAuthorised();
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
