export default function authHeader() {
  //return { Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZzFAZ21haWwuY29tIiwiaWF0IjoxNzA4MTY4NTIxfQ.o8ZcDTsicQtik3IabRQxMPSujUNuGi8epYimgYB-j7M" };
  const user = JSON.parse(localStorage.getItem("authResponse"));

  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
}