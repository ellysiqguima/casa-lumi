# Italy Lumi House

Website demonstrativo de um hotel ficticio na Puglia. Inclui pagina inicial, quartos, experiencias e formulario de pedido de reserva com estimativa ilustrativa.

## Abrir o site

Os arquivos do site ficam em `docs/`, configurada como origem do GitHub Pages. Pode iniciar um servidor local na pasta do projeto:

```bash
python3 -m http.server 8000
```

Depois, aceda a <http://localhost:8000/docs/>.

## Paginas

- `docs/index.html` - pagina inicial
- `docs/sobre.html` - historia ficticia da casa
- `docs/quartos.html` - quartos e precos demonstrativos
- `docs/atividades.html` - experiencias opcionais e precos demonstrativos
- `docs/contactos.html` - formulario de pedido e estimativa de valores

Os dados de disponibilidade, precos e parcelamento sao apenas demonstrativos. O formulario nao processa pagamentos nem cria reservas reais.
