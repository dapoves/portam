

export function validarEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export function validarPassword(password) {
    return password.length >= 3;
}

export function validarRepetirPassword(password, rePassword) {
    return password === rePassword;
}

export function validarNombre(nombre) {
    return nombre.length >= 3 && !/\d/.test(nombre);
}

export function validarApellido(apellido) {
    return apellido.length >= 3;
}

export function validarTelefono(telefono) {
    const re = /^\d+$/;
    return telefono.length === 9 && re.test(telefono);
}
