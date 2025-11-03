--teste1
Create table departamento
(id_departamento NUMBER,
 nome VARCHAR2(15)
 );

select *
from departamento;

--dicionário; Armazena meta dados ou seja dados sobre dados. Conjunto
--de tabelas que tem as informções sobre os objetos do banco de dados;

select table_name
from user_tables;

insert into departamento(id_departamento,nome)
values(1,'Vendas');

select * 
from departamento;

desc departamento;

insert into departamento(id_departamento,nome)
values(1,'Rh');

select * 
from departamento;

--Porque não deu erro??

--Teste 2

drop table departamento;

select table_name
from user_tables;

Create table departamento
(id_departamento NUMBER PRIMARY KEY,
 nome VARCHAR2(15)
 );

insert into departamento(id_departamento,nome)
values(1,'Vendas');

insert into departamento(id_departamento,nome)
values(1,'Rh');

--Porque o segundo comando deu erro?

--teste3

drop table departamento;

create table departamento
( id_departamento NUMBER 
    constraint PK_departamento primary key,
  nome varchar2(15)
);

insert into departamento(id_departamento,nome) values(1,'Vendas');

insert into departamento(id_departamento,nome) values(1,'Rh');

select *
from departamento;

--O segundo insert funcionou? 
--Qual a diferença do teste 2 para o teste3

--teste 4

drop table departamento;

create table departamento
( id_departamento NUMBER,
  nome varchar2(15),
  constraint PK_departamento primary key (id_departamento)
);

--A declaração acima é equivalente a do teste 3

-- Teste 5

drop table departamento;

create table departamento
( id_departamento NUMBER,
  nome varchar2(15),
  constraint PK_departamento primary key (id_departamento)
);


insert into departamento(id_departamento,nome) values (1,'Vendas');

select *
from departamento;

alter table departamento add localizacao varchar2(10);

insert into departamento(id_departamento,nome) values (2, 'Rh');

select *
from departamento;

-- Teste 6

drop table departamento;

create table departamento
( id_departamento NUMBER,
  nome varchar2(15),
  constraint PK_departamento primary key (id_departamento)
);


insert into departamento values (1,'Vendas');

select *
from departamento;

alter table departamento add localizacao varchar2(10);

insert into departamento values (2, 'Rh');

--Qual a diferença destes dos testes 5 e 6? Porque o insert acima não funcionou?


-- Teste 7

drop table departamento;

Create table departamento
(id_departamento NUMBER constraint pk_depatamento PRIMARY KEY,
 nome VARCHAR2(15)
 );

Create table funcionario
(id_funcionario NUMBER constraint pk_funcionario PRIMARY KEY,
 nome VARCHAR2(15),
 salario number,
 id_departamento number,
 constraint FK_Funcionario_id_departamento 
   foreign key (id_departamento) references departamento
 );

insert into departamento(id_departamento,nome)
values(1,'Vendas');

insert into departamento(id_departamento,nome)
values(2,'Rh');

insert into funcionario(id_funcionario,nome,salario,id_departamento)
values(100,'Antonio',3000,null);

insert into funcionario(id_funcionario,nome,salario,id_departamento)
values(101,'Pedro',2000,1);

insert into funcionario(id_funcionario,nome,salario,id_departamento)
values(102,'Maria',5000,1);

--Porque este insert vai dar erro??

insert into funcionario(id_funcionario,nome,salario,id_departamento)
values(103,'Ana',3000,3);

-- Teste 8

drop table funcionario;
drop table departamento;

Create table departamento
(id_departamento NUMBER constraint pk_depatamento PRIMARY KEY,
 nome VARCHAR2(15)
 );

Create table funcionario
(id_funcionario NUMBER constraint pk_funcionario PRIMARY KEY,
 nome VARCHAR2(15),
 salario number,
 id_departamento number constraint FK_Funcionario_id_departamento references departamento
 );

insert into departamento(id_departamento,nome)
values(1,'Vendas');

insert into departamento(id_departamento,nome)
values(2,'Rh');

insert into funcionario(id_funcionario,nome,salario,id_departamento)
values(100,'Antonio',3000,null);

insert into funcionario(id_funcionario,nome,salario,id_departamento)
values(101,'Pedro',2000,1);

insert into funcionario(id_funcionario,nome,salario,id_departamento)
values(102,'Maria',5000,1);

-- Teste 9

drop table funcionario;
drop table departamento;

Create table departamento
(id_departamento NUMBER constraint pk_depatamento PRIMARY KEY,
 nome VARCHAR2(15)
 );

Create table funcionario
(id_funcionario NUMBER constraint pk_funcionario PRIMARY KEY,
 nome VARCHAR2(15),
 salario number,
 id_departamento number
);

alter table funcionario add
 constraint FK_Funcionario_id_departamento 
   foreign key (id_departamento) references departamento;

insert into departamento(id_departamento,nome)
values(1,'Vendas');

insert into departamento(id_departamento,nome)
values(2,'Rh');

insert into funcionario(id_funcionario,nome,salario,id_departamento)
values(100,'Antonio',3000,null);

insert into funcionario(id_funcionario,nome,salario,id_departamento)
values(101,'Pedro',2000,1);

insert into funcionario(id_funcionario,nome,salario,id_departamento)
values(102,'Maria',5000,1);

-- teste10
Colocar os comandos do teste9 em um arquivo e executar

@<caminho>\nome_arquivo

@C:\Users\tanis\Downloads\teste.txt

--teste11


drop table funcionario;
drop table departamento;

Create table departamento
(id_departamento NUMBER constraint pk_depatamento PRIMARY KEY,
 nome VARCHAR2(15)
 );

Create table funcionario
(id_funcionario NUMBER constraint pk_funcionario PRIMARY KEY,
 nome VARCHAR2(15),
 salario number,
 id_departamento number
);

alter table funcionario add
 constraint FK_Funcionario_id_departamento 
   foreign key (id_departamento) references departamento;

create sequence s_depto;
create sequence s_funcionario start with 100;

insert into departamento(id_departamento,nome)
values(s_depto.nextval,'Vendas');

insert into departamento(id_departamento,nome)
values(s_depto.nextval,'Rh');

select *
from departamento;

insert into funcionario(id_funcionario,nome,salario,id_departamento)
values(s_funcionario.nextval,'Antonio',3000,null);

insert into funcionario(id_funcionario,nome,salario,id_departamento)
values(s_funcionario.nextval,'Pedro',2000,1);

insert into funcionario(id_funcionario,nome,salario,id_departamento)
values(s_funcionario.nextval,'Maria',5000,1);

select *
from funcionario;

select *
from funcionario
where nome = 'Pedro';

select *
from funcionario
where nome like '%o';

select nome
from funcionario;

select nome
from funcionario
where id_departamento=null;


select nome
from funcionario
where id_departamento is null;

update funcionario
set id_departamento = 2
where id_departamento is null;

select id_departamento
from funcionario;

select distinct id_departamento
from funcionario;

--teste 12

drop table departamnto;

Porque deu erro??

-- teste13

drop table funcionario;
drop table departamento;

-- teste14


Create table departamento
(id_departamento NUMBER constraint pk_depatamento PRIMARY KEY,
 nome VARCHAR2(15)
 );

Create table funcionario
(id_funcionario NUMBER constraint pk_funcionario PRIMARY KEY,
 nome VARCHAR2(15),
 salario number,
 id_departamento number
);

alter table funcionario add
 constraint FK_Funcionario_id_departamento 
   foreign key (id_departamento) references departamento;

drop table departamento cascade constraints;
select * from funcionario;
select * from departamento;




