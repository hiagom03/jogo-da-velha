const tic_tac_toe = {
    //Array do tabuleiro, é uma um array de string vázio.
    //Depois a gente vai preencher ele com X e O.
    board: ['','','','','','','','','',],
    symbols: {
        options: ['X','O'],
        turn_index: 0,
        change: function(){
            this.turn_index = (this.turn_index === 0 ? 1:0);
        }
    },
    container_element: null,
    gameover: false,
    winning_sequences:[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],
    placar: null,
    cont: [0, 0],
    

    init: function(container){
        this.container_element = container;   
        this.placar = document.querySelector('.pontos');
    },

    make_play: function(position){
        if (this.gameover) return false;
        if (this.board[position] === ''){
            this.board[position] = this.symbols.options [this.symbols.turn_index];
            this.draw();
            let winning_sequences_index = this.check_win(this.symbols.options [this.symbols.turn_index]);
            if (winning_sequences_index >=0){
                this.game_is_over();

                
            }else{            
                this.symbols.change();
            }
            return true;
        } else{
            return false;
        }

    },

    check_win: function (symbol){
        for (i in this.winning_sequences){
            if (this.board[this.winning_sequences[i][0]] == symbol &&
                this.board[this.winning_sequences[i][1]] == symbol &&
                this.board[this.winning_sequences[i][2]] == symbol){
                    console.log(`sequencia vencedora ${i}`);
                    this.draw(i);
                    //não faço ideia de como esse symbol chegou aqui;
                    this.contaPlacar(symbol);
                    return i;                    
                }
        };
        return -1;
    },

    game_is_over: function(){
        this.gameover =  true;
        console.log ('O JOGO ACABOU');


    },
    
    start_game: function(){
        this.board.fill('');
        this.draw();
        this.gameover = false
    },

    contaPlacar: function(xixbola){
        this.placar.innerHTML = null;
        let conta = null;
        
        if (xixbola == 'O'){
            this.cont[0]++;
        }else
            if (xixbola == 'X'){
                this.cont[1]++;
            }
        
        conta = 
        '<div class="plac">O</div>' +
        '<div>Placar</div>' +
        '<div class="plac">X</div>' + 
        '<div>' + this.cont[0] + '</div>' +
        '<div>vs</div>' +
        '<div>' + this.cont[1] + '</div>';
        
        this.placar.innerHTML = conta;
    },

    zerarPlacar: function (){
        this.cont = [0, 0];
        this.contaPlacar ();
        this.start_game();

        console.log('zerou o placar');
    },

    //função para desenhar as posições do tabuleiro na tela;
    draw: function (vencedor) {
        let index = this.winning_sequences[vencedor];

        let content = '';

        if (vencedor) {
            for (i in this.board) {
                if (i == index[0] || i == index[1] || i == index[2]) {
                    content += '<div id="win" onclick="tic_tac_toe.make_play(' + i + ')">' + this.board[i] + '</div>';
                } else {
                    content += '<div onclick="tic_tac_toe.make_play(' + i + ')">' + this.board[i] + '</div>';
                }
            }

        } else {
            for (i in this.board) {
                content += '<div onclick="tic_tac_toe.make_play(' + i + ')">' + this.board[i] + '</div>';
            }
        }

        this.container_element.innerHTML = content;
    }
};