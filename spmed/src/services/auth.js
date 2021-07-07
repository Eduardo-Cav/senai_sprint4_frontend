//Define a constante usuarioAutenticado que verifica se o usuário esta realmente logado
export const usuarioAutenticado = () => localStorage.getItem('token') !== null;

//const parseJwt que retorna o payload do usuário convertido em json
export const parseJwt = () =>{
    //define a variavel base64 que recebe o payload do usuário logado codificado
    let base64 = localStorage.getItem('token').split('.')[1]

    return JSON.parse(window.atob(base64));
}