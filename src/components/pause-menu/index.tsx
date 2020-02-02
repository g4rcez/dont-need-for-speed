import { COLORS } from "components/car";
import { Container } from "components/layout/grid";
import Modal from "components/modal";
import React from "react";
import { setCarColor } from "services/settings";
type Props = {
  visible: boolean;
  onClose(): void;
  carColor(color: COLORS): void;
};

const btn = "br1 pv2 ph3 bg-animate pointer b--transparent ma2 w-30";

export const PauseMenu: React.FC<Props> = ({ visible, onClose, carColor }) => {
  const setColor = (color: COLORS) => () => {
    setCarColor(color);
    carColor(color);
  };

  return (
    <Modal
      closeOnEsc={false}
      title={<h2 className="nt2">Don't need for speed</h2>}
      visible={visible}
      onClose={onClose}
    >
      <Container>
        <Container>
          <h3>Configurações</h3>
        </Container>
        <Container>
          <p>Escolha a cor do seu carro:</p>
        </Container>
        <Container>
          <button
            onClick={setColor("original")}
            className={`${btn} white bg-blue hover-bg-dark-blue`}
          >
            Azul
          </button>
          <button
            onClick={setColor("green")}
            className={`${btn} white bg-green hover-bg-dark-green`}
          >
            Verde
          </button>
          <button
            onClick={setColor("orange")}
            className={`${btn} white bg-orange hover-bg-dark-orange`}
          >
            Laranja
          </button>
          <button
            onClick={setColor("pink")}
            className={`${btn} white bg-pink hover-bg-dark-pink`}
          >
            Rosa
          </button>
          <button
            onClick={setColor("purple")}
            className={`${btn} white bg-purple hover-bg-dark-purple`}
          >
            Roxo
          </button>
        </Container>
        <Container>Esse jogo é infinito, não espere um final</Container>
      </Container>
    </Modal>
  );
};
