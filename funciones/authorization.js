export function isRepartidor() {
  return localStorage.getItem('user_role') === 'repartidor';
}

export function isSocio() {
  return localStorage.getItem('user_role') === 'socio';
}