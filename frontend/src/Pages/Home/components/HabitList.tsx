
export default function HabitList() {
    return (
        <div className="card">
            <div className="d-flex justify-content-between ">
                <h5 className="card-header">Habits</h5>
                
            </div>
            <div className="table-responsive text-nowrap">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Frequency</th>
                            <th>Amount</th>
                            <th>Change</th>
                            <th>Target</th>
                            <th>Reminder</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                        <tr>
                            <td>
                                <strong>Reading</strong>
                            </td>
                            <td>{"4"} times in a week</td>
                            <td>{"12 pages"}</td>
                            <td>{"0"}</td>
                            <td>infinfty</td>
                            <td>off</td>
                            <td>
                                <button type="button" className="btn p-1 btn-primary"><i className="bx bx-edit-alt me-1"></i></button>
                                <button type="button" className="btn p-1 m-1 btn-danger"><i className="bx bx-trash me-1"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div >
    )
}
