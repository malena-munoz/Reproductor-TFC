document.getElementById("continuar-recover-button").addEventListener("click", function() {
    var emailRecover = document.getElementById("email_recover").value;

    // Realizar una solicitud AJAX para verificar si el email está disponible
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "./view/verifiers/verificar_email.php?email=" + encodeURIComponent(emailRecover), true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = xhr.responseText.trim(); // Trim para eliminar posibles espacios en blanco
                if (response === "ocupado") {
                    var xhrPost = new XMLHttpRequest();
                    xhrPost.open("POST", "./view/verifiers/enviar_codigo.php", true);
                    xhrPost.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    xhrPost.onreadystatechange = function() {
                        if (xhrPost.readyState === XMLHttpRequest.DONE) {
                            if (xhrPost.status === 200) {
                                var responsePost = xhrPost.responseText.trim(); // Trim para eliminar posibles espacios en blanco
                                if (responsePost === "enviado") {
                                    document.getElementById("instruccion-recover-email").style.display = "none";
                                    document.getElementById("email-recover-inp").style.display = "none";
                                    document.getElementById("instruccion-code").style.display = "block";
                                    document.getElementById("code-inp").style.display = "block";
                                    document.getElementById("already-logged").style.display = "none";
                                    document.getElementById("password-changed").style.display = "none";
                                    document.getElementById("validar-recover-button").style.display = "block";
                                    document.getElementById("continuar-recover-button").style.display = "none";
                                    var bar = document.getElementById("bar");
                                    bar.style.width = "48px";
                                    var style = document.createElement('style');
                                    style.innerHTML = '#bar::after {display: none;}';
                                    document.head.appendChild(style);
                                    bar.style.transition = "width 0.5s ease-in-out";

                                    Swal.fire({
                                        toast: true,
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Código enviado exitosamente.',
                                        showConfirmButton: false,
                                        timer: 3000,
                                        background: '#4caf50', // Color verde para éxito
                                        color: '#ffffff'
                                    });
                                } else {
                                    Swal.fire({
                                        toast: true,
                                        position: 'top-end',
                                        icon: 'error',
                                        title: 'No se pudo enviar el código. Por favor, inténtelo de nuevo.',
                                        showConfirmButton: false,
                                        timer: 3000,
                                        background: '#f44336', // Color rojo para error
                                        color: '#ffffff'
                                    });
                                }
                            } else {
                                Swal.fire({
                                    toast: true,
                                    position: 'top-end',
                                    icon: 'error',
                                    title: 'Se produjo un error al verificar el email. Por favor, inténtelo de nuevo.',
                                    showConfirmButton: false,
                                    timer: 3000,
                                    background: '#f44336', // Color rojo para error
                                    color: '#ffffff'
                                });
                            }
                        }
                    };
                    xhrPost.send("email=" + encodeURIComponent(emailRecover));
                } else {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'error',
                        title: 'El email no está registrado. Por favor, elija otro.',
                        showConfirmButton: false,
                        timer: 3000,
                        background: '#f44336', // Color rojo para error
                        color: '#ffffff'
                    });
                }
            } else {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Se produjo un error al verificar el email. Por favor, inténtelo de nuevo.',
                    showConfirmButton: false,
                    timer: 3000,
                    background: '#f44336', // Color rojo para error
                    color: '#ffffff'
                });
            }
        }
    };
    xhr.send();
});

document.getElementById("validar-recover-button").addEventListener("click", function() {
    var inputs = document.querySelectorAll("#code-inp .input");
    var code = Array.from(inputs).map(input => input.value).join("");

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "./view/verifiers/validar_codigo.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = xhr.responseText;
                if (response === "validado") {
                    document.getElementById("instruccion-code").style.display = "none";
                    document.getElementById("code-inp").style.display = "none";
                    document.getElementById("validar-recover-button").style.display = "none";
                    document.getElementById("instruccion-recover-clave").style.display = "block";
                    document.getElementById("clave-recover-inp").style.display = "block";
                    document.getElementById("claveRepetida-recover-inp").style.display = "block";
                    document.getElementById("instruccion-recover-claveRepetida").style.display = "block";
                    document.getElementById("cambiar-password-button").style.display = "block";

                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'success',
                        title: 'Código validado exitosamente.',
                        showConfirmButton: false,
                        timer: 3000,
                        background: '#4caf50', // Color verde para éxito
                        color: '#ffffff'
                    });
                } else {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'error',
                        title: 'El código de verificación es incorrecto. Por favor, inténtelo de nuevo.',
                        showConfirmButton: false,
                        timer: 3000,
                        background: '#f44336', // Color rojo para error
                        color: '#ffffff'
                    });
                }
            } else {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Se produjo un error al verificar el código. Por favor, inténtelo de nuevo.',
                    showConfirmButton: false,
                    timer: 3000,
                    background: '#f44336', // Color rojo para error
                    color: '#ffffff'
                });
            }
        }
    };
    xhr.send("code=" + encodeURIComponent(code));
});

document.getElementById("cambiar-password-button").addEventListener("click", function() {
    var newPassword = document.getElementById("clave_recover").value;
    var repeatPassword = document.getElementById("claveRepetida_recover").value;

    if (newPassword !== repeatPassword) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: 'Las contraseñas no coinciden. Por favor, inténtelo de nuevo.',
            showConfirmButton: false,
            timer: 3000,
            background: '#f44336', // Color rojo para error
            color: '#ffffff'
        });
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "./view/inserts/cambiar_password.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = xhr.responseText;
                if (response === "cambiado") {
                    document.getElementById("instruccion-recover-clave").style.display = "none";
                    document.getElementById("clave-recover-inp").style.display = "none";
                    document.getElementById("claveRepetida-recover-inp").style.display = "none";
                    document.getElementById("instruccion-recover-claveRepetida").style.display = "none";
                    document.getElementById("cambiar-password-button").style.display = "none";
                    document.getElementById("password-changed").style.display = "block";

                    var bar = document.getElementById("bar");
                    var barBefore = bar.previousElementSibling;
                    bar.style.width = "66px";
                    var style = document.createElement('style');
                    style.innerHTML = '#bar::after, #bar::before {display: none;}';
                    document.head.appendChild(style);

                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'success',
                        title: 'Contraseña cambiada exitosamente.',
                        showConfirmButton: false,
                        timer: 3000,
                        background: '#4caf50', // Color verde para éxito
                        color: '#ffffff'
                    });

                    // setTimeout(function() {
                    //     location.reload(true);
                    // }, 3000); // Esperar 3 segundos antes de recargar
                } else {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'error',
                        title: 'No se pudo cambiar la contraseña. Por favor, inténtelo de nuevo.',
                        showConfirmButton: false,
                        timer: 3000,
                        background: '#f44336', // Color rojo para error
                        color: '#ffffff'
                    });
                }
            } else {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Se produjo un error al cambiar la contraseña. Por favor, inténtelo de nuevo.',
                    showConfirmButton: false,
                    timer: 3000,
                    background: '#f44336', // Color rojo para error
                    color: '#ffffff'
                });
            }
        }
    };
    xhr.send("new_password=" + encodeURIComponent(newPassword));
});

document.addEventListener("DOMContentLoaded", function() {
    var inputs = document.querySelectorAll("#code-inp .input");

    inputs.forEach((input, index) => {
        input.addEventListener("input", function() {
            if (input.value.length === input.maxLength) {
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            }
        });

        input.addEventListener("keydown", function(event) {
            if (event.key === "Backspace" && input.value.length === 0) {
                if (index > 0) {
                    inputs[index - 1].focus();
                }
            }
        });

        input.addEventListener("paste", function(event) {
            event.preventDefault();
            var pasteData = (event.clipboardData || window.clipboardData).getData("text").trim();
            pasteData = pasteData.slice(0, inputs.length); // Asegurar que no exceda el número de inputs

            pasteData.split("").forEach((char, i) => {
                inputs[i].value = char;
            });

            // Enfocar en el siguiente input después del pegado
            var nextInputIndex = pasteData.length < inputs.length ? pasteData.length : inputs.length - 1;
            inputs[nextInputIndex].focus();
        });
    });
});