export interface Repository<T> {
  create(model: T): Promise<T>;

  findAll(): Promise<T[]>;

  findById(id: string): Promise<T>;

  update(id: string, model: Partial<T>): Promise<void>;

  delete(id: string): Promise<void>;
}
