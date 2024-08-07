const prompt = require("prompt-sync")({ sigint: true });

let residencias = [];
let ultimoID = 1;

const modelo = (ID) => {
    let bairro = prompt("Nome do bairro: ");
    let rua = prompt("Nome da sua rua: ");
    let numero = parseInt(prompt("Número da sua casa: "));

    let moradores = [];

    while (true) {
        let morador = prompt("Nome de quem mora na residência? (Caso tenha finalizado, digite 'fim') ");

        if (morador === "fim") {
            break;
        } else {
            moradores.push(morador);
        }
    }

    if (bairro != "" && rua != "" && !isNaN(numero) && moradores != "") {
        let residencia;
        if (ID == undefined) {
            residencia = {
                ID: ultimoID,
                bairro,
                rua,
                numero,
                moradores,
            };
            ultimoID++;
        } else {
            residencia = {
                bairro,
                rua,
                numero,
                moradores,
            };
        }
        return residencia;
    } else {
        console.log("dados invalidos");
    }
};

const adicionarResidencia = () => {
    let residencia = modelo();
    if (residencia === undefined) {
        return;
    } else {
        residencias.push(residencia);
        console.log("Residencia adicionada");
    }
};

const listarResidencia = () => {
    if (residencias.length === 0) {
        console.log("Não possui nenhuma residência registrada!");
        return false;
    } else {
        residencias.forEach((residencia) => {
            console.log(
                `ID: ${residencia.ID}
        Bairro: ${residencia.bairro}, 
        Rua: ${residencia.rua}, 
        Número: ${residencia.numero}`
            );
            residencia.moradores.forEach((morador, indice) => {
                console.log(`Morador ${indice + 1}: ${morador}`);
            });
        });
    }
    return true;
};

const atualizarResidencia = () => {
    if (listarResidencia()) {
        const ID = prompt("Qual ID da residencia que deseja editar: ");

        if (ID > 0 && ID != undefined) {
            let residenciaEditada = modelo(ID);

            if (residenciaEditada === undefined) {
                return;
            } else {
                residencias[ID] = residenciaEditada;
                console.log("Residência Atualizada!");
            }
        } else {
            console.log("ID inexistente");
        }
    } else {
        return;
    }
};

const deletarResidencia = () => {
    if (!listarResidencia()) {
        return;
    }

    const ID = prompt("Qual ID deseja remover: ");

    residencias.forEach((residencia, indice) => {
        if (residencia.ID == ID) {
            residencias.splice(indice, 1);
            console.log("Residência removida!");
        }
    });
};

funcoes = {
    adicionarResidencia,
    listarResidencia,
    atualizarResidencia,
    deletarResidencia,
};

module.exports = funcoes;
