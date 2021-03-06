import React from "react";
import "./SpecificationsTable.scss";

export default function SpecificationsTable(props) {
  const { specLabels, specInformations } = props; // [{ jsonProperty: "some customized text" },...]

  return (
    <section className="specs-table">
      <h2 className="specs-table__heading">Thông tin thêm</h2>
      <table border="0" cellSpacing="0">
        <tbody>
          {specLabels.map((spec, id) => {
            const [jsonProp] = Object.keys(spec);
            const [label] = Object.values(spec);

            return (
              <tr
                key={id}
                className={`specs-table__row--${id % 2 === 0 ? "even" : "odd"}`}
              >
                <td>
                  <span>{label}</span>
                </td>
                <td>
                  <span>{specInformations[jsonProp]}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

// eg:
// const specLabels = [
//     { name: "tên sản phẩm" },
//     { brand: "tên hãng" },
//     { material: "chất liệu" },
//     { waranty: "số tháng bảo hành" },
//     { mfgDate: "ngày sản xuất" },
//     { compatibility: "khả năng tương thích" },
//   ];
