export function meUrl(withSync: any) {
  return `/users/me/?$withSync=${withSync || 0}`;
}

export function logoutUrl() {
  return "/auth/users/signout";
}

export function fileUrl() {
  return "/files";
}

export function createOrderUrl() {
  return "/user/orders/";
}

export function updateOrderUrl(id: any) {
  return `/user/orders/${id || ""}`;
}

export function userLocationUrl() {
  return "/users/me/location";
}

export function deleteBasketUrl(id: any) {
  return `/user/orders/${id}`;
}

export function settingsUrl() {
  return "/user/settings";
}

export function unratedOrdersUrl() {
  return "/users/me/unrated-orders";
}

export function loginUrl() {
  return "/auth/users/signin";
}

export function passwordUrl() {
  return "/auth/users/forgot";
}

export function singUpUrl() {
  return "/users/me";
}

export function smsVerificationUrl(paylaod: any) {
  return `/auth/users/confirm?type=phone&uid=${paylaod?.uid}&code=${paylaod?.code}`;
}

export function resendUrl() {
  return "/auth/users/resend";
}
