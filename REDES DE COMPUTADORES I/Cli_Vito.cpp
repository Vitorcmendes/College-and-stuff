//Adicionar no coompilador -lws2_32

#include <windows.h>
#include <winsock.h>
#include <stdio.h>
#include <string.h>
#include <locale.h>

#define REMOTE_SERVER_PORT 2022
#define SERVIDOR "192.168.15.26"
 
int main() {
	
	
  int sd, pnt_bind;
  struct sockaddr_in cliAddr, remoteServAddr;
  WSADATA wsaData;
  LPHOSTENT lpHostEntry;
  char mensagem[20];
  FILE *file;
  float numeros[1001];
  float num;
  int flag, j, bytes_enviados;
  int i = 0;
  long tam_arq;
  
  struct dados {
  	char buffer[1001];
  	int flag;
  } dados;
  
  size_t lidos;
  

  WSAStartup(MAKEWORD(2,1),&wsaData);

  lpHostEntry = gethostbyname(SERVIDOR);


  sd = socket(AF_INET,SOCK_DGRAM,0);

  if(sd<0) {
    printf("\n Nao foi possivel criar o socket com o servidor %s:\n",SERVIDOR);
    exit(1);
  }

  /* bind */
  cliAddr.sin_family = AF_INET;
  cliAddr.sin_addr.s_addr = htonl(INADDR_ANY);
  cliAddr.sin_port = htons(0);

  remoteServAddr.sin_family = AF_INET;
  remoteServAddr.sin_addr = *((LPIN_ADDR)*lpHostEntry->h_addr_list);

  remoteServAddr.sin_port = htons(REMOTE_SERVER_PORT);

if (bind(sd, (struct sockaddr *) &cliAddr, sizeof(cliAddr)) < 0) {
    printf("Erro ao associar o socket do cliente.\n");
    exit(1);
}
	
	
	 file = fopen ("origem.txt","r");
	 if (file == NULL) {
        printf("Erro ao abrir o arquivo");
        return 1;
    }
    
    lidos = fread(dados.buffer, sizeof(char), sizeof(dados.buffer) - 1, file); // (dados.buffer) -1 para ler 1000 números e deixar um espaço para o \0
    dados.buffer[lidos] = '\0';  // Termina a string corretamente
    fclose(file);
    
   // Apenas para conferir o conteúdo 
     printf("Conteúdo lido do arquivo:\n%s", dados.buffer);
     printf("\n\nConteúdo do buffer:\n%s", dados.buffer);
   
    
     printf("\n\n Digite uma flag de opeção disponível\n");
     printf("\tFlag 1: soma\n \tFlag 2: média aritmética simples\n \tFlag 3: retornar maior e menor valor do arquivo\n");
     scanf("%d", &dados.flag);


    bytes_enviados = sendto(sd,(char *)&dados, sizeof(dados), 0 , (struct sockaddr*)&remoteServAddr, sizeof(remoteServAddr));
 
  	if (bytes_enviados<=0) {
	  	printf("ERRO: Nao foi possivel enviar valor %d \n",i-1);
      	exit(1);
    }
    
    printf("Bytes enviados: %d\n", bytes_enviados);
    printf("Flag enviada: %d\n", dados.flag);
    
    char resposta[100];
	int tam = sizeof(remoteServAddr);

	int bytes_recebidos = recvfrom(sd, resposta, sizeof(resposta), 0, (struct sockaddr*)&remoteServAddr, &tam);
	
	resposta[bytes_recebidos] = '\0'; // para o printf não mostrar lixo de memória
	
	if (bytes_recebidos > 0) {
    	printf("\nResposta do servidor: %s\n", resposta);
	} else {
    	printf("\nNão foi possível receber resposta do servidor.\n");
	}
  
  closesocket(sd);
  return 1;

}
