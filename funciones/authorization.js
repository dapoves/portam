export function isRepartidor() {
  return localStorage.getItem('user_role') === 'repartidor';
}