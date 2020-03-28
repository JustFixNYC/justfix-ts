import React from 'react';
import ReactDOM from 'react-dom';
import AriaModal from '../react-aria-modal';

class DemoOne extends React.Component<{}, {modalActive: boolean}> {
  constructor(props: {}) {
    super(props);
  
    this.state = {
      modalActive: false
    };
  
    this.activateModal = this.activateModal.bind(this);
    this.deactivateModal = this.deactivateModal.bind(this);
    this.getApplicationNode = this.getApplicationNode.bind(this);
  }
  
  activateModal = () => {
    this.setState({ modalActive: true });
  };

  deactivateModal = () => {
    this.setState({ modalActive: false });
  };
  
  getApplicationNode = () => {
    const el = document.getElementById('application');
    if (!el) throw new Error('assertion failure');
    return el;
  };
  
  render() {
    const modal = this.state.modalActive
      ? <AriaModal
          titleText="demo one"
          onExit={this.deactivateModal}
          initialFocus="#demo-one-deactivate"
          getApplicationNode={this.getApplicationNode}
          underlayStyle={{ paddingTop: '2em' }}
        >
          <div id="demo-one-modal" className="modal">
            <div className="modal-body">
              <p>
                Here is a modal
                {' '}
                <a href="#">with</a>
                {' '}
                <a href="#">some</a>
                {' '}
                <a href="#">focusable</a>
                {' '}
                parts.
              </p>
            </div>
            <footer className="modal-footer">
              <button id="demo-one-deactivate" onClick={this.deactivateModal}>
                deactivate modal
              </button>
            </footer>
          </div>
        </AriaModal>
      : false;

    return (
      <div>
        <button onClick={this.activateModal}>
          activate modal
        </button>
        {modal}
      </div>
    );
  }
}
  
ReactDOM.render(<DemoOne />, document.getElementById('demo-one'));
