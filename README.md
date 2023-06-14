# TP-Eng-Software


1
 
1. Manual de Instalação 
Para instalar e executar o sistema é preciso ter o node instalado no computador, caso 
não possua basta acessar esse link: https://nodejs.org/en/download, baixar o arquivo 
e seguir as instruções que serão dadas. Ao instalar o node basta executar o comando 
node --version para verificar se foi instalado corretamente na versão escolhida. 
Com o node instalado, basta seguir os seguintes passos: 
• Descompactar o zip 
• Acessar a pasta “server” pelo terminal 
• Executar o comando “npm i” para instalar as bibliotecas utilizadas 
• Executar o comando “npm run start” para rodar o servidor 
 
• Para rodar os testes basta executar o seguinte comando na pasta “server” pelo 
terminal: “npx jest” 
Por ser um api, é possível testar os métodos através de algum programa que execute as 
requisições. Utilizamos o Postman para testar as nossas, mas é possível testar pelo 
próprio browser (apenas as funções que não requerem inserção de dados). Por 
exemplo, ao colocar o endereço “localhost:3000/api/cliente/retornaTodosClientes” no 
browser, o sistema retornara uma lista com todos os sistemas cadastrados. Todas as 
funções do tipo “GET” podem ser testadas pelo browser. 
 
2. Implementação 
a.  Arquitetura 
Para garantir uma implementação parcial eficiente do sistema de 
gerenciamento da oficina, concentramos nossos esforços no desenvolvimento 
do backend, que foi implementado como uma API REST. Essa abordagem 
permite que o frontend se conecte facilmente ao backend por meio das rotas 
criadas para cada função específica, tornando o backend independente do 
sistema em si. 
A estrutura técnica do sistema é organizada em torno de rotas, controladores e 
modelos. As rotas são responsáveis por definir os pontos de extremidade da 
API e os métodos HTTP correspondentes, como GET, POST, PUT e DELETE. Cada 
rota é mapeada para um controlador específico, que contém a lógica de 
negócios necessária para processar a solicitação e retornar as respostas 
apropriadas. 
Dentro dos controladores, os modelos são utilizados para interagir com o 
banco de dados e realizar operações de leitura, gravação, atualização e 
exclusão de dados através dos serviços, que seriam os métodos de cada 
objeto.  
Ao seguir os princípios REST, utilizamos verbos HTTP adequados para cada 
ação, garantindo uma API consistente e intuitiva. Por exemplo, para obter 
informações sobre um cliente, utilizamos uma rota GET específica para 
clientes. Para criar um cliente, utilizamos uma rota POST na mesma rota de 
clientes. 
Além disso, é importante mencionar que a implementação parcial do sistema 
de oficina permite uma modularidade eficiente. À medida que novas 
funcionalidades são desenvolvidas, basta adicionar novas rotas, controladores 
e serviços conforme necessário, mantendo uma separação clara entre as 
diferentes partes do sistema. 
Por meio dessa arquitetura, nosso sistema de gerenciamento da oficina se 
torna escalável, flexível e de fácil manutenção. O backend funciona como um 
serviço independente, pronto para ser conectado e utilizado por diferentes 
frontends, como aplicativos web e móveis. 
b. Ferramenta Utilizadas 
A implementação do nosso sistema foi realizada utilizando Node.js em 
conjunto com TypeScript. Essa escolha foi baseada em diversos fatores 
estratégicos e técnicos. O Node.js tem ganhado crescente popularidade e se 
estabelecido como uma das principais linguagens de desenvolvimento no 
mercado atual. Além disso, a equipe responsável pela implementação já 
possuía experiência e familiaridade com essa linguagem, o que facilitou o 
processo de desenvolvimento. 
Optamos por utilizar TypeScript em vez de JavaScript devido às suas vantagens 
em relação à tipagem estática. O TypeScript é um superconjunto do JavaScript 
que adiciona recursos de tipagem estática, fornecendo uma camada adicional 
de segurança e robustez ao código. Essa abordagem nos permite detectar 
erros de tipagem em tempo de compilação, o que facilita a identificação e 
correção de possíveis problemas antes mesmo da execução do sistema. 
Além disso, optamos por utilizar o framework Sequelize para estabelecer a 
conexão com o banco de dados. Essa escolha foi baseada na familiaridade 
prévia da equipe com o Sequelize e nos benefícios oferecidos por esse 
framework. O Sequelize é um ORM (Object-Relational Mapping) para Node.js 
que simplifica a interação com bancos de dados relacionais, como o SQLite. 
Ao utilizar o Sequelize, podemos aproveitar as funcionalidades fornecidas pelo 
framework para criar, consultar, atualizar e excluir registros no banco de dados 
de forma mais intuitiva e eficiente. O Sequelize também oferece recursos de 
validação de dados, mapeamento de objetos para tabelas do banco de dados e 
gerenciamento de relacionamentos entre as entidades. 
Para fins de implementação parcial e testes, decidimos criar um banco de 
dados local utilizando o SQLite. No entanto, é importante ressaltar que, em um 
ambiente de produção, seria necessário configurar um banco de dados 
adequado e seguro para atender às demandas de escalabilidade e segurança. 
 
c.  Estrutura 
A estrutura do código do sistema de gerenciamento da oficina é organizada da 
seguinte maneira: 
1. Pasta "Eletro Master": Essa pasta abriga todo o código relacionado ao sistema 
de gerenciamento da oficina. 
2. Pasta "server": Dentro da pasta "Eletro Master", a pasta "server" contém todos 
os arquivos relacionados ao backend do sistema. 
