export function isRepartidor() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('user_role') === 'repartidor';
  } else {
    return false;
  }
}

export function isSocio() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('user_role') === 'socio';
  } else {
    return false;
  }
}