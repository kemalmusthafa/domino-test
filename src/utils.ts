// utils.ts

// Definisikan tipe untuk sebuah kartu domino
export type Domino = [number, number];

// Fungsi untuk menghitung jumlah double
export const countDoubles = (dominoes: Domino[]): number => {
  return dominoes.filter(([a, b]) => a === b).length; // Menghitung domino yang memiliki angka yang sama
};

// Fungsi untuk menghitung jumlah threes (domino yang muncul lebih dari dua kali)
export const countThrees = (dominoes: Domino[]): number => {
  const count: Record<string, number> = {};
  
  // Menghitung kemunculan setiap domino
  dominoes.forEach(([a, b]) => {
    const key = [a, b].sort().join(","); // Sort untuk memastikan [3,4] dan [4,3] dihitung sama
    count[key] = (count[key] || 0) + 1;
  });

  // Menghitung jumlah domino yang muncul lebih dari dua kali
  return Object.values(count).filter(value => value > 2).length;
};

export const sortDominoes = (dominoes: Domino[], order: "asc" | "desc"): Domino[] => {
  return [...dominoes].sort((a, b) => {
    const totalA = a[0] + a[1];
    const totalB = b[0] + b[1];
    if (totalA === totalB) return order === "asc" ? a[0] - b[0] : b[0] - a[0];
    return order === "asc" ? totalA - totalB : totalB - totalA;
  });
};

export const removeDuplicates = (dominoes: Domino[]): Domino[] => {
    const count: Record<string, number> = {};
  
    // Hitung setiap domino yang ada, perhatikan urutan yang terbalik
    dominoes.forEach(([a, b]) => {
      const key = [a, b].sort().join(","); // Gunakan sort agar pasangan terbalik dihitung sama
      count[key] = (count[key] || 0) + 1;
    });
  
    // Kembalikan domino yang hanya muncul sekali
    return dominoes.filter(([a, b]) => {
      const key = [a, b].sort().join(",");
      return count[key] <= 1; //agar dapat menghapus nilai input baru yang sama
    });
  };
  

export const flipCards = (dominoes: Domino[]): Domino[] => {
  return dominoes.map(([a, b]) => [b, a]);
};

export const removeByTotal = (dominoes: Domino[], total: number): Domino[] => {
  return dominoes.filter(([a, b]) => a + b !== total);
};

export const handleRemoveByInput = (dominoes: Domino[], input: number | ""): Domino[] => {
  if (input === "") return dominoes;
  return removeByTotal(dominoes, input);
};

export const handleAddDomino = (dominoes: Domino[], newDomino: Domino): Domino[] => {
    const [a, b] = newDomino;
  
    if (a < 0 || a > 6 || b < 0 || b > 6) {
      throw new Error("Domino values must be between 0 and 6.");
    }
  
    // Cek apakah domino yang dimasukkan sudah ada dalam data (urutan terbalik [a, b] atau [b, a])
    const duplicateIndex = dominoes.findIndex(
      ([x, y]) => (x === a && y === b) || (x === b && y === a)
    );
  
    // Jika ada domino yang sama (terbalik), hapus dan kembalikan data
    if (duplicateIndex !== -1) {
      const updatedDominoes = [...dominoes];
      updatedDominoes.splice(duplicateIndex, 1);
      return updatedDominoes; // Menghapus domino yang sama
    }
  
    // Jika tidak ada duplikat, tambahkan domino baru
    return [...dominoes, newDomino];
  };
  