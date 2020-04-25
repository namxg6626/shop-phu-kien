import React from "react";
import arrowLeft from "../../assets/icons/arrow-left.png";
import arrowRight from "../../assets/icons/arrow-right.png";
import "./Paginate.scss";

export default class Paginate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paginateSelection: [],
      page: 1,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { maxPage, page } = props;
    let newpaginateSelection = [];
    for (let i = 1; i <= maxPage; i++) newpaginateSelection.push(i);
    return {
      paginateSelection: newpaginateSelection,
      page: parseInt(page),
    };
  }

  goto = (e) => {
    const value = parseInt(e.target.value);
    const { maxPage, setPage } = this.props;
    if (e.key === "Enter")
      if (/[\D ]/.test(e.target.value) || value > maxPage || value < 1)
        alert(`Nhập số trang từ 1 đến ${maxPage}`);
      else setPage(value);
  };

  nextPage = () => {
    const { page, setPage, maxPage } = this.props;
    if (page === maxPage) return;
    setPage(page + 1);
  };

  prevPage = () => {
    const { page, setPage } = this.props;
    if (page === 1) return;
    setPage(page - 1);
  };

  render() {
    return (
      <section className="paginate">
        <div className="paginate__selection--btn" onClick={this.prevPage}>
          <img src={arrowLeft} alt="Previous" />
        </div>
        <div className="paginate__container">
          <div className="paginate__view">
            {this.state.paginateSelection.map((num) => {
              let classNames = "paginate__selection";
              if (num === this.state.page)
                classNames += " paginate__selection--selected";
              return (
                <div
                  onClick={() => this.props.setPage(num)}
                  key={num}
                  className={classNames}
                >
                  {num}
                </div>
              );
            })}
          </div>
        </div>
        <div className="paginate__selection--btn" onClick={this.nextPage}>
          <img src={arrowRight} alt="Next" />
        </div>
        <div className="paginate__goto">
          <label htmlFor="goto">Tới trang:</label>
          <input
            type="text"
            name="goto"
            id="goto"
            defaultValue={this.state.page}
            onKeyUp={this.goto}
          />
        </div>
      </section>
    );
  }
}
