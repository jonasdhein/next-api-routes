import { NextResponse } from "next/server";

let tarefas = [
    { id: 1, tarefa: "Estudar Next.js", status: false },
    { id: 2, tarefa: "Estudar TypeScript", status: false },
    { id: 3, tarefa: "Estudar React", status: false }]

export async function GET(request: Request) {
    return NextResponse.json(tarefas);
}

export async function POST(request: Request) {
    const { tarefa, status } = await request.json();
    const id = tarefas.length + 1;

    tarefas.push({ id, tarefa, status });

    //retorna a lista atualizada
    return NextResponse.json(tarefas);
}

//api/tarefas?index=1
// export async function PUT(request: Request) {
//     const { searchParams } = new URL(request.url);
//     const index = searchParams.get('index');

//     const data = await request.json();
//     if (index != null) {
//         const oldData = tarefas[Number(index)];
//         tarefas[Number(index)] = { ...oldData, status  };
//     }

//     //retorna a lista atualizada
//     return NextResponse.json({});
// }

//api/tarefas
export async function PUT(request: Request) {
    const { id, tarefa, status } = await request.json();
    const index = tarefas.findIndex(t => t.id === id);

    if (index !== -1) {
        const oldData = tarefas[index];
        if (oldData.id > 0) {
            tarefas[index] = { ...oldData, status: status };
        }
    } else {
        return NextResponse.json("Tarefa não encontrada", { status: 404 });
    }

    //retorna a lista atualizada
    return NextResponse.json("Tarefa atualizada com sucesso", { status: 200 });
}

export async function DELETE(request: Request) {
    const { id } = await request.json();
    const index = tarefas.findIndex(t => t.id === id);

    if (index !== -1) {
        tarefas.splice(index, 1); //remove 1 item na posição indicada
    } else {
        return NextResponse.json("Tarefa não encontrada", { status: 404 });
    }

    //retorna a lista atualizada
    return NextResponse.json("Tarefa deletada com sucesso", { status: 200 });
}