import React, { Fragment } from "react";
import LinkLoading from "./LinkLoading";
function Paginate(props) {
  let pageCount = Math.ceil(props.totalItemCount / props.numOfItemsInPage);
  const pageMax = pageCount;
  const twoDotLimit = 7;
  const pageEffectLimit = 13;
  const pageIncLimit = 4;
  let lastDots = false;
  let firstDots = false;
  if (pageMax >= pageEffectLimit) {
    pageCount = props.maxPage;
    if (props.page >= twoDotLimit && props.page <= pageMax - twoDotLimit + 2) {
      firstDots = true;
      lastDots = true;
      pageCount += props.page - (pageIncLimit - 1);
    } else if (props.page < twoDotLimit) {
      firstDots = false;
      lastDots = true;
      if (props.page >= pageIncLimit) {
        pageCount += props.page - (pageIncLimit - 1);
      }
    } else {
      firstDots = true;
      lastDots = false;
      if (props.page <= pageMax - 3) {
        pageCount = pageMax - (pageMax - props.page) - 3;
      } else {
        pageCount = pageMax - pageCount;
      }
    }
  }
  return (
    <div className="paginate">
      <div className="paginate-flex">
        <LinkLoading
          className={`paginate-item paginate-previous ${
            props.page - 1 <= 0 ? "disabled" : ""
          }`}
          to={setSearchParams(
              props.page - 1 <= 0 ? 1 : props.page - 1,
              props.path
            )
          }
        >
          Previous
        </LinkLoading>
        {setPages(
          firstDots,
          lastDots,
          props.page,
          pageMax,
          twoDotLimit,
          pageCount,
          props.path
        )}
        <LinkLoading
          className={`paginate-item paginate-next ${
            props.page + 1 >= pageMax ? "disabled" : ""
          }`}
          to={setSearchParams(
              props.page + 1 >= pageMax ? pageMax : props.page + 1,
              props.path
            )
          }
        >
          Next
        </LinkLoading>
      </div>
    </div>
  );
}

const setPages = (
  firstDots,
  lastDots,
  currentPage,
  pageMax,
  twoDotLimit,
  pageCount,
  path
) => {
  return (
    <div className="paginate-items">
      {!firstDots && lastDots ? (
        <Fragment>
          {[...Array(pageCount || currentPage).keys()].map((x) => (
            <LinkLoading key={x}
              className={`paginate-item ${
                currentPage === x + 1 ? "selected" : ""
              }`}
              to={setSearchParams(x + 1, path)}
            >
              {x + 1}
            </LinkLoading>
          ))}
          {lastDotPart(currentPage, path, pageMax)}
        </Fragment>
      ) : firstDots && !lastDots ? (
        <Fragment>
          {firstDotPart(currentPage, path)}
          {[...Array(pageMax || currentPage).keys()]
            .slice(pageCount, pageMax)
            .map((x) => (
              <LinkLoading key={x}
                className={`paginate-item ${
                  currentPage === x + 1 ? "selected" : ""
                }`}
                to={setSearchParams(x + 1, path)}
              >
                {x + 1}
              </LinkLoading>
            ))}
        </Fragment>
      ) : firstDots && lastDots ? (
        <Fragment>
          {firstDotPart(currentPage, path)}

          {[...Array(pageCount || currentPage).keys()]
            .slice(currentPage - 3, currentPage + 2)
            .map((x) => (
              <LinkLoading key={x}
                className={`paginate-item ${
                  currentPage === x + 1 ? "selected" : ""
                }`}
                to={setSearchParams(x + 1, path)}
              >
                {x + 1}
              </LinkLoading>
            ))}

          {lastDotPart(currentPage, path, pageMax)}
        </Fragment>
      ) : (
        <Fragment>
          {[...Array(pageCount || currentPage).keys()].map((x) => (
            <LinkLoading key={x}
              className={`paginate-item ${
                currentPage === x + 1 ? "selected" : ""
              }`}
              to={setSearchParams(x + 1, path)}
            >
              {x + 1}
            </LinkLoading>
          ))}
        </Fragment>
      )}
    </div>
  );
};

const setSearchParams = (params, path) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set("page", params <= 0 ? 1 : params);
  return path + "?" + searchParams.toString();
};

const firstDotPart = (currentPage, path) => {
  return (
    <Fragment>
      <LinkLoading
        className={`paginate-item ${currentPage === 1 ? "selected" : ""}`}
        to={setSearchParams(1, path)}
      >
        {1}
      </LinkLoading>
      <LinkLoading
        className={`paginate-item ${currentPage === 2 ? "selected" : ""}`}
        to={setSearchParams(2, path)}
      >
        {2}
      </LinkLoading>
      <a className="paginate-dots">...</a>
    </Fragment>
  );
};

const lastDotPart = (currentPage, path, pageMax) => {
  return (
    <Fragment>
      <a className="paginate-dots">...</a>
      <LinkLoading
        className={`paginate-item ${
          currentPage === pageMax - 1 ? "selected" : ""
        }`}
        to={setSearchParams(pageMax - 1, path)}
      >
        {pageMax - 1}
      </LinkLoading>
      <LinkLoading
        className={`paginate-item ${currentPage === pageMax ? "selected" : ""}`}
        to={setSearchParams(pageMax, path)}
      >
        {pageMax}
      </LinkLoading>
    </Fragment>
  );
};
export default Paginate;
