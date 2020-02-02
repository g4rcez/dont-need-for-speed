## Run, run, run

## Demonstração

Tá com preguiça de instalar local? Tente a versão online. Agora se quiser instalar local:
```bash
git clone URL
cd URL
npm install # eu aconselho você usar o yarn se estiver instalado
npm start # Viu, bem simples
```

## Construindo o game

Apesar de ser um jogo simples, a construção deu um trabalhinho. *Nunca havia feito um.*

O cenário do jogo sempre será o mesmo, apenas um GIF rodando e somente o carro é interativo neste cenário. O posicionamento foi todo feito com flexbox.

Um esquema de preferência com session storage para a cor do carro foi criado, utilizando uma biblioteca de minha autoria, chamada [storage-manager-js](https://github.com/g4rcez/storage-manager-js).

A movimentação do carro foi feita com flexbox também, apenas alternando entre `flex-start`, `center` e `flex-end` para o `justify-content`.

## Bibliotecas 

- [react](https://reactjs.org/)
- [react-Icons](https://react-icons.netlify.com/)
- [styled-components](https://styled-components.com/)
- [tachyons](http://tachyons.io/)
- [storage-manager-js](https://github.com/g4rcez/storage-manager-js)


## Desafios Pessoais

- [ x ] Configurar cor do carro - A intenção era fazer ajustes com `CSS Filter`
- [ x ] Criar um controlador de áudio - Nunca havia trabalhado com a tag `<audio />` e queria ter uma oportunidade para aplicar
- [ x ] Hook para controle de touch em elementos HTML - Fazer um `gesture` parecido com a experiência de desenvolvimento parecida com a de React Native