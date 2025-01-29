//   Jogo da Memória
//  Este jogo da memória consiste em mostrar 6 números aleatórios para o jogador,
// durante 5 segundos.
// O objetivo do jogador é acertar os 6 números na ordem mostrada.
// O fluxograma segue:
// 1- Gerar números aleatórios
// 2- Verificar e não permitir repetição de números
// 3- Armazenar os números válidos
// 4 - Criar um temporizador para marcar o tempo
// 5 - Exibir os números durante 5 segundos
// 6 - Pedir a entrada dos números exibidos
// 7 - Ler e armazenar os números digitados
// 8 - Comparar os números exibidos com os digitados
// 9 - Exibir as respectivas mensagens de erro ou acerto
// 10 - Perguntar se o jogador deseja continuar e ler sua resposta
// Código escrito na plataforma GDB Online Debugger (linux) algumas funções podem ser incompatíveis.



#include <stdio.h>
#include <stdlib.h> // NULL, srand()
#include <locale.h> // Acentuação e casas decimais padrão pt-br
#include <time.h>   // time.h dá a data e hora do sistema e atribui esse valor à variável passada como parâmetro
#include <unistd.h> // sleep
 
int main(){

   int numeros[6];
   int x = 0;
   int y;
   int igualxy;
   int tempo;
   int i;
   int resposta[6];
   char continua;
   
   
   do{ // Loop que faz o jogo reiniciar até que o usuário digite n ao final do jogo
       
   srand(time(NULL)); // Essa função inicia rand() e impede que apareçam sempre os mesmos números no programa
   
   // Para mostrar números aletatórios, primeiramente precisamos gerá-los e armazená-los em memória.
   // O loop seguinte pega números aleatórios, verifica se são iguais e armazena no vetor números[6]
   do {
		numeros[x] = (rand() % 20);       // x é a posição atual do vetor e y a posição anterior
		igualxy = 0;
		for (y = 0; y < x; y++) {         // executa enquanto y<x e incrementa y toda vez que executar
			if (numeros[x] == numeros[y]) // Verificação de igualdade.
				igualxy = 1;              // Se os números forem iguais, igualxy recebe 1. 
		}
		if(igualxy == 0)                  // Se igualxy for 1 então não será incrementada a variável x
			x++;                          //  e a posição do vetor não vai andar.
	} while (x < 6);                      // Pois o vetor tem 6 posições partindo de zero


   printf("\n\n\t  JOGO DA MEMÓRIA");
   printf("\n\n    Este é o jogo da memória. Serão mostrados 6 números e o jogador terá 5 segundos para memorizá-los");
   printf ("\n\n      Aperte ENTER para jogar.");
   printf("\n");
   getchar(); // Espera o ENTER
   
   system("clear"); // Limpa a tela inteira até a última linha anterior ao cursor
   
   printf("\n\n   PREPARADO???");
   getchar(); // Espera o ENTER
   
   tempo = 5; // Tempo em segundos
   
   // O loop seguinte limpa a tela anterior e mostra os números
   // e a variável tempo a cada repetição. Foi adicionada a função sleep
   //  ao final do loop para que o loop pare durante 1 segundo até continuar.
   // Assim, tem-se a impressão de que os dados estão sendo exibidos de forma 
   // fixa e apenas o temporizador está passando...
   do{
      system("clear");
      printf("\n\n\t  JOGO DA MEMÓRIA");
      printf("\n\n    Memorize os números abaixo em %d", tempo);
      printf("\n\n       %d   %d   %d   %d   %d   %d   ",numeros[0],numeros[1],numeros[2],numeros[3],numeros[4],numeros[5]);
      printf("\n"); // Para que o cursor fique no lugar certo e a próxima limpeza de tela ocorra direito
      tempo--;
    sleep(1); // Pausa 1 segundo com o tempo já decrementado
   } while(tempo>0);
   
   // Após mostrar os números o jogo segue pedindo ao jogador que digite os números exibidos
  
   system("clear");
   printf("\n\n    Quais números foram exibidos??");
   printf("\n\n\t 1° Número: ");
   scanf("%d", &resposta[0]); // alocação direta no vetor de respostas
   printf("\n\t 2° Número: ");
   scanf("%d", &resposta[1]);
   printf("\n\t 3° Número: ");
   scanf("%d", &resposta[2]);
   printf("\n\t 4° Número: ");
   scanf("%d", &resposta[3]);
   printf("\n\t 5° Número: ");
   scanf("%d", &resposta[4]);
   printf("\n\t 6° Número: ");
   scanf("%d", &resposta[5]);
   
   
   // Em seguida, a verificação das respostas.
   
   if ( resposta[0] == numeros[0] && resposta[1] == numeros[1] && resposta[2] == numeros[2] && resposta[3] == numeros[3] && resposta[4] == numeros[4] && resposta[5] == numeros[5]){
   printf("\n\n   Parabéns, você acertou! Sua memória é muito boa!");
   printf("\n\n\t     %d   %d   %d   %d   %d   %d ",numeros[0],numeros[1],numeros[2],numeros[3],numeros[4],numeros[5]);
   } else {
      printf("\n    Que pena, não acertou...");
      printf("\n\n\n    Sua resposta: ");
      printf("     %d   %d   %d   %d   %d   %d", resposta[0], resposta[1], resposta[2], resposta[3], resposta[4], resposta[5]);
      printf("\n\n    Números mostrados: ");
      printf("%d   %d   %d   %d   %d   %d ",numeros[0],numeros[1],numeros[2],numeros[3],numeros[4],numeros[5]);
   }
        continua = 's'; // Para que o programa não se encerre diretamente, esta variável
                        // não pode chegar na linha do while com lixo.
        printf("\n\n          Deseja continuar jogando? S-Sim, N-Não.");
        printf("\n           ");
        scanf("%s", &continua);
        
 
 }while (continua == 's' ||  continua =='S');
 
    printf("\n\n\n\t    OBRIGADO POR JOGAR!");
   
    return 0;
}
