CREATE TABLE usuarios (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    pontuacao INTEGER DEFAULT 0
);

CREATE TABLE questoes (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    enunciado VARCHAR(3000) NOT NULL,
    tipo VARCHAR(20) NOT NULL
);

CREATE TABLE respostas (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    resposta VARCHAR(255) NOT NULL, 
    correta BOOLEAN NOT NULL, 
    id_questao INTEGER,
    CONSTRAINT fk_questao FOREIGN KEY (id_questao) REFERENCES questoes(id)
);

INSERT INTO usuarios (nome, pontuacao) VALUES ('Nick', 90), ('Dexter', 75), ('Bruna', 59);

INSERT INTO questoes (enunciado, tipo) 
VALUES ('
Java é uma linguagem de programação orientada objetos, lançada em 1995, pela Sun Microsystems, que, ao longo dos anos, tornou-se uma das linguagens mais populares utilizadas devido à sua portabilidade e eficiência. Sobre os conceitos fundamentais da linguagem Java, marque V para as afirmativas verdadeiras e F para as falsas.
( ) Uma classe pode herdar de várias classes ao mesmo tempo.
( ) O uso de “super” é restrito à chamada de métodos do construtor da classe pai.
( ) A palavra-chave “final” pode ser usada para prevenir que um método seja sobrescrito.
( ) A interface em Java pode conter apenas métodos abstratos.
', 'optativa');

INSERT INTO respostas (resposta, correta, id_questao) 
VALUES ('FFFF', FALSE, 1);

INSERT INTO respostas (resposta, correta, id_questao) 
VALUES ('VFVF', FALSE, 1);

INSERT INTO respostas (resposta, correta, id_questao) 
VALUES ('FFVF', FALSE, 1);

INSERT INTO respostas (resposta, correta, id_questao) 
VALUES ('VVVV', TRUE, 1);

INSERT INTO questoes (enunciado, tipo) 
VALUES ('Declare uma variável chamada numero inteira em java com o valor 10!', 'aberta');

INSERT INTO respostas (resposta, correta, id_questao) 
VALUES ('int numero = 10;', TRUE, 2);

INSERT INTO questoes (enunciado, tipo) 
VALUES ('
Sobre a palavra-chave "static" em Java, marque V para as afirmativas verdadeiras e F para as falsas:
( ) Um método static pode acessar variáveis de instância diretamente.
( ) Um bloco static é executado quando a classe é carregada.
( ) Um método static pode ser sobrescrito por uma subclasse.
( ) Variáveis static pertencem à instância da classe.
', 'optativa');

INSERT INTO respostas (resposta, correta, id_questao) VALUES ('FVFF', TRUE, 3);
INSERT INTO respostas (resposta, correta, id_questao) VALUES ('VVFF', FALSE, 3);
INSERT INTO respostas (resposta, correta, id_questao) VALUES ('FFVF', FALSE, 3);
INSERT INTO respostas (resposta, correta, id_questao) VALUES ('FFFF', FALSE, 3);

INSERT INTO questoes (enunciado, tipo) 
VALUES ('Escreva um método em Java que retorne a soma de dois números inteiros.', 'aberta');

INSERT INTO respostas (resposta, correta, id_questao) 
VALUES ('public int soma(int a, int b) { return a + b; }', TRUE, 4);

INSERT INTO questoes (enunciado, tipo) 
VALUES ('
Sobre tratamento de exceções em Java, marque V para as afirmativas verdadeiras e F para as falsas:
( ) Uma exceção verificada (checked) precisa ser declarada ou capturada.
( ) A palavra-chave "finally" é opcional em um bloco try-catch.
( ) É possível ter mais de um bloco catch para um mesmo bloco try.
( ) A exceção "NullPointerException" é uma exceção verificada.
', 'optativa');

INSERT INTO respostas (resposta, correta, id_questao) VALUES ('VVVF', TRUE, 5);
INSERT INTO respostas (resposta, correta, id_questao) VALUES ('VVFF', FALSE, 5);
INSERT INTO respostas (resposta, correta, id_questao) VALUES ('VFFF', FALSE, 5);
INSERT INTO respostas (resposta, correta, id_questao) VALUES ('FFVF', FALSE, 5);

INSERT INTO questoes (enunciado, tipo) 
VALUES ('Declare um array de inteiros em Java com 5 posições.', 'aberta');

INSERT INTO respostas (resposta, correta, id_questao) 
VALUES ('int[] array = new int[5];', TRUE, 6);

INSERT INTO questoes (enunciado, tipo) VALUES ('
Sobre a herança em Java, marque V para as afirmativas verdadeiras e F para as falsas:
( ) Em Java, uma classe pode estender somente uma única classe.
( ) Uma classe abstrata pode ser instanciada.
( ) Uma subclasse herda todos os métodos da classe pai, inclusive os privados.
( ) O modificador "protected" permite acesso apenas dentro do mesmo pacote ou por subclasses.
', 'optativa');

INSERT INTO respostas (resposta, correta, id_questao) VALUES ('VFFV', TRUE, 7);
INSERT INTO respostas (resposta, correta, id_questao) VALUES ('VVFF', FALSE, 7);
INSERT INTO respostas (resposta, correta, id_questao) VALUES ('FFFF', FALSE, 7);
INSERT INTO respostas (resposta, correta, id_questao) VALUES ('VVVV', FALSE, 7);

INSERT INTO questoes (enunciado, tipo) VALUES ('
Sobre o operador "instanceof" em Java, marque V para as afirmativas verdadeiras e F para as falsas:
( ) O operador "instanceof" é utilizado para verificar se um objeto é instância de uma determinada classe ou interface.
( ) Se o objeto for null, a expressão "instanceof" retorna false.
( ) O operador "instanceof" pode ser utilizado para converter tipos.
( ) A verificação com "instanceof" pode prevenir ClassCastException.
', 'optativa');

INSERT INTO respostas (resposta, correta, id_questao) VALUES ('VVFV', TRUE, 8);
INSERT INTO respostas (resposta, correta, id_questao) VALUES ('VVFF', FALSE, 8);
INSERT INTO respostas (resposta, correta, id_questao) VALUES ('FFVF', FALSE, 8);
INSERT INTO respostas (resposta, correta, id_questao) VALUES ('FFFF', FALSE, 8);

INSERT INTO questoes (enunciado, tipo) VALUES ('Escreva um código em Java que imprima os números de 1 a 5.', 'aberta');

INSERT INTO respostas (resposta, correta, id_questao) 
VALUES ('for (int i = 1; i <= 5; i++) { System.out.println(i); }', TRUE, 9);

INSERT INTO questoes (enunciado, tipo) VALUES ('
Sobre encapsulamento em Java, marque V para as afirmativas verdadeiras e F para as falsas:
( ) O encapsulamento permite restringir o acesso direto a alguns dos componentes do objeto.
( ) Em Java, atributos declarados como private só podem ser acessados por métodos da própria classe.
( ) Métodos getters e setters são utilizados para acessar e modificar os atributos privados.
( ) O encapsulamento impede completamente a modificação dos valores dos atributos de uma classe.
', 'optativa');

INSERT INTO respostas (resposta, correta, id_questao) VALUES ('VVVF', TRUE, 10);
INSERT INTO respostas (resposta, correta, id_questao) VALUES ('VVFF', FALSE, 10);
INSERT INTO respostas (resposta, correta, id_questao) VALUES ('VFFF', FALSE, 10);
INSERT INTO respostas (resposta, correta, id_questao) VALUES ('FFVF', FALSE, 10);

